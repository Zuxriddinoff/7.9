import { memo} from 'react';
import { useCar } from '../api/hooks/useCar';

interface ICar {
  id?: number;
  name: string;
  price: number | string;
  brand: string;
  color: string;
  release_date: string;
  power: number | string;
}

// const initialState: ICar = {
//   name: "",
//   price: "",
//   brand: "",
//   color: "",
//   release_date: "",
//   power:""
// };

const Car = () => {
    const {getCar} = useCar()
    const { data } = getCar()
    // const [editingItem, setEditingItem] = useState<any>(null);
    // const [formData, setFormData] = useState<ICar>(initialState)
    
    const cars: ICar[] = data?.data ?? [];
    console.log(cars);

//     const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (editingItem) {
//       updateDoctor.mutate(
//         { id: editingItem.id, data: formData },
//         {
//           onSuccess: () => {
//             setFormdata(initialState);
//           },
//         }
//       );
//     } else {
//       createDoctor.mutate(treatment, {
//         onSuccess: () => {
//           setFormdata(initialState);
//         },
//       });
//     }
//   };


  return (
    <div className="Car">
      <div></div>
      <div>
        { cars?.map((item:ICar) => (
            <div key={item.id}>
                <h2>{item.name}</h2>
                <p>{item.brand}</p>
                <p>{item.price}</p>
                <p>{item.color}</p>
                <p>{item.release_date}</p>
                <p>{item.power}</p>
                <hr />
            </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Car);