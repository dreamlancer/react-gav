const AvailableVehicles = ({ imgUrl, carName }) => {
  return (
    <div className="text-center available-vehicle mx-lg-4">
      <img className="w-100" src={imgUrl} />
      <h3 className="mt-5 text-center mb-lg-0 mb-sm-5 car-name">{carName}</h3>
    </div>
  );
};

export default AvailableVehicles;
