import { memo, useState, type FormEvent } from "react";
import { useCar } from "../api/hooks/useCar";

interface ICar {
  id?: number;
  name: string;
  price: number | string;
  brand: string;
  color: string;
  release_date: string;
  power: number | string;
}

const initialState: ICar = {
  name: "",
  price: "",
  brand: "",
  color: "",
  release_date: "",
  power: "",
};

const Car = () => {
  const { getCar, updateCar, createCar, deleteCar } = useCar();
  const { data } = getCar();
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<ICar>(initialState);

  const cars: ICar[] = data?.data ?? [];
  console.log(cars);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let car = {
        name,
        brand, 
        price: Number(price),
        color,
        release_date,
        power: Number(power)        
    }
    if (editingItem) {
      updateCar.mutate(
        { id: editingItem.id, data: car },
        {
          onSuccess: () => {
            setFormData(initialState);
          },
        }
      );
    } else {
      createCar.mutate(car, {
        onSuccess: () => {
          setFormData(initialState);
        },
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (id:any) => {
    deleteCar.mutate(id)
  }

  const handleUpdate = (car:ICar) => {
    setEditingItem(car)
    setFormData(car)
  }

  const {name, brand, price, color, power, release_date} = formData

  return (
    <div className="container mx-auto">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-md p-6 mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Product</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              value={name}
              name="name"
              onChange={handleChange}
              type="text"
              placeholder="Enter product name"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand
            </label>
            <input
              value={brand}
              name="brand"
              onChange={handleChange}
              type="text"
              placeholder="Enter brand name"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price ($)
            </label>
            <input
              value={price}
              name="price"
              onChange={handleChange}
              type="number"
              placeholder="Enter price"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <input
              value={color}
              name="color"
              onChange={handleChange}
              type="text"
              placeholder="Enter color"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Release Date
            </label>
            <input
              value={release_date}
              name="release_date"
              onChange={handleChange}
              type="date"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Power
            </label>
            <input
              value={power}
              name="power"
              onChange={handleChange}
              type="text"
              placeholder="e.g. 200W"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Save Product
          </button>
        </form>
      </div>
      <div className="w-full grid grid-cols-4 gap-5">
        {cars?.map((item: ICar) => (
          <div
            key={item.id}
            className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {item.name}
            </h2>

            <div className="space-y-1 text-gray-600">
              <p>
                <span className="font-medium text-gray-700">Brand:</span>{" "}
                {item.brand}
              </p>
              <p>
                <span className="font-medium text-gray-700">Price:</span> $
                {item.price}
              </p>
              <p>
                <span className="font-medium text-gray-700">Color:</span>{" "}
                {item.color}
              </p>
              <p>
                <span className="font-medium text-gray-700">Release Date:</span>{" "}
                {item.release_date}
              </p>
              <p>
                <span className="font-medium text-gray-700">Power:</span>{" "}
                {item.power}
              </p>
            </div>

            <div className="mt-4 flex flex-row gap-10">
              <button onClick={() => handleDelete(item.id)} className="w-[50%] bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                delete
              </button>
              <button onClick={() => handleUpdate(item)} className="w-[50%] bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Car);
