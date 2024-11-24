"use client";

import { useState, useEffect } from "react";

interface Training {
  id: number;
  sectionName: string;
  availableSlots: number;
  totalSlots: number;
}

export default function HomePage() {
  const [schedule, setSchedule] = useState<Training[]>([]); // Указан тип состояния
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch("http://localhost:8082/schedule");
        if (!response.ok) {
          throw new Error("Ошибка при загрузке расписания");
        }
        const data: Training[] = await response.json(); // Явно указываем, что ожидаем массив объектов типа Training
        setSchedule(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  const handleRegister = async (trainingId: number) => {
    try {
      const response = await fetch("http://localhost:8083/queue/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trainingId, userId: 1 }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при записи на тренировку");
      }

      alert("Вы успешно записались на тренировку!");

      // Обновляем состояние
      setSchedule((prev) =>
          prev.map((training) =>
              training.id === trainingId
                  ? { ...training, availableSlots: training.availableSlots - 1 }
                  : training
          )
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Неизвестная ошибка");
    }
  };

  return (
      <main className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Система управления очередями
        </h1>

        {loading && <p>Загрузка расписания...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && schedule.length === 0 && <p>Нет доступных тренировок.</p>}

        {!loading && schedule.length > 0 && (
            <div className="space-y-4">
              {schedule.map((training) => (
                  <div
                      key={training.id}
                      className="p-4 bg-white rounded shadow-md border"
                  >
                    <h2 className="text-xl font-semibold">{training.sectionName}</h2>
                    <p>
                      <strong>Дата:</strong>{" "}
                      {new Date().toLocaleString()} {/* Добавьте дату из `training` */}
                    </p>
                    <p>
                      <strong>Места:</strong> {training.availableSlots} /{" "}
                      {training.totalSlots}
                    </p>
                    <button
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => handleRegister(training.id)}
                    >
                      Записаться
                    </button>
                  </div>
              ))}
            </div>
        )}
      </main>
  );
}
