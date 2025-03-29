function Spinner() {
  return (
    <div className="flex justify-center items-center overflow-y-hidden">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}

export default Spinner;
