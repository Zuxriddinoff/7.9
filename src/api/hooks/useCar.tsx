import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query"
import { api } from ".."

export const car = "car"

export const useCar = () => {
    const client = useQueryClient()

    const getCar = () => useQuery({
        queryKey: [car],
        queryFn: () => api.get("car").then(res => res.data),
        // gcTime: 1000 * 60 * 10, // cache saqlash vaqti
        // staleTime: 1000 * 60 // yangilash vaqti
    }) 

    const getCarById = (id:number) => useQuery({
        queryKey: [car],
        queryFn: () => api.get(`car/${id}`).then(res => res.data)
    }) 

    const createCar = useMutation({
        mutationFn: (data: any) => api.post("car", data),
        onSuccess: ()=>{
            client.invalidateQueries({queryKey: [car]})
        }
    })

    const deleteCar = useMutation({
        mutationFn: (id: number) => api.delete(`car/${id}`),
        onSuccess: ()=>{
            client.invalidateQueries({queryKey: [car]})
        }
    })

    const updateCar = useMutation({
        mutationFn: ({id, data}:{id:number, data:any})=> api.patch(`car/${id}`, data),
        onSuccess: () => {
            client.invalidateQueries({queryKey: [car]})
        }
    })

    return {getCar, getCarById, createCar, deleteCar, updateCar}
}