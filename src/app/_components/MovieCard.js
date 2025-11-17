export const MovieCard = (props) => {
  return (
    <div className="h-109.75 bg-[#F4F4F5] flex flex-col rounded-lg gap-1">
      <img className="h-85 w-full rounded-t-lg" src={props.img}></img>
      <div className="flex flex-col mx-2">
        <p className="text-xs">{props.rate}</p>
        <p className="text-lg">{props.title}</p>
      </div>
    </div>
  );
};
