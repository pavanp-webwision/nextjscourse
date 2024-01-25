import Category from "./components/Category"
import { getCategory } from "../../../services/api";
import { Suspense } from "react";
import Loading from './loading'

export default async function Page() {

  // Fetch data from server component
  const fetchData = async () => {
    // const res = await fetch('/app/dashboard/api/route')
    // const data = await res.json()
    // return data
    // const response = await getCategory();
    
    // const response = await fetch(`http://localhost:3000/api/category`);
    const response = await fetch(`http://127.0.0.1:1337/api/categories`, { credentials: 'include' });
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    const data = await response.json()
    console.log("SERVER FETCHED", data?.data)
    if (data) {
      return data?.data
    };

  }

  const data = await fetchData()

  return (
    <Suspense fallback={<Loading />}><Category data={data || null} /></Suspense>
  )
}