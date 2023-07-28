import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

const Header = () => {
  return (
    <header className='flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6'>
    
      <Link to='/' className='tracking-widest flex items-center'>
        <img className='mr-2 w-8 sm:w-12' src='/logo.png' alt='' />
        The Pizza Co.
      </Link>
      
      
      <SearchOrder  />
      <Username />
    </header>
  );
};

export default Header;
