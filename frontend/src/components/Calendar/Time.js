export const Time = () => {
  const hours = Array.from(
    { length: 24 },
    (_, index) => `${index.toString().padStart(2, "0")}:00`
  );

  return (
    <>
      <div className="flex flex-col items-center justify-between  ml-12">
        {hours.map((hour) => (
          <p className="pb-[68px]" key={hour}>
            {hour}
          </p>
        ))}
      </div>
    </>
  );
};
