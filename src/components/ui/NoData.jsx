export const NoData = ({ content }) => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center w-full h-full">
      <img src="/nodata.jpg" alt="No Data" width={280} />
      <p className="text-2xl">{content}</p>
    </div>
  );
};
