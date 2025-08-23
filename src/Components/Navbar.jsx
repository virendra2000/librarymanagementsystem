import { FaUserCircle } from "react-icons/fa";
import { MdLocalLibrary } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Navbar = ({userData}) => {
    const navigate = useNavigate();
    const callLogoutPage = async () => {
        toast.success('Logout Successfully!', {
            position: toast.POSITION.TOP_CENTER,
            className: 'bg-white text-green-400 dark:text-white dark:bg-slate-600 font-bold',
        });
        navigate('/');
    }
    return (
        <>
            <nav className="bg-slate-100 p-4 shadow-md shadow-gray-300 flex flex-row items-center justify-between">
                <span className="text-2xl font-semibold flex flex-row items-center gap-2">
                    <MdLocalLibrary color="#2fd911" size="40"/>
                    <span>Library Management System</span>
                </span>
                <div className="flex flex-row gap-2 items-center justify-between">
                    <FaUserCircle size="40"/>
                    <span>{userData.username}</span>
                    <span onClick={callLogoutPage}>
                        <IoLogOutOutline size="30" cursor="pointer"/>
                    </span>
                </div>
            </nav>
            <ToastContainer />
        </>
    );
}
export default Navbar;