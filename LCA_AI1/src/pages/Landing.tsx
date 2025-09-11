import { useNavigate } from "react-router-dom"

export default function Landing() {
    const navigate = useNavigate();

    return <>
        <div className= "flex flex-col items-center ">
            <span className = "text-6xl mt-[100px] pb-[2rem]"> Metalytics AI </span>
            <span className = "text-4xl text-gray-700 pb-[2rem]"> An AI-powered platform for Life Cycle Assessment (LCA) </span>
            <button className = "bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800" 
            onClick={() => navigate('/input')}
            > Get Started </button>
        </div>
    </>
}