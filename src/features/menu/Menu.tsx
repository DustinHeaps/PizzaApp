import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import { MenuItemType } from "../../types";
import MenuItem from "./MenuItem";

const Menu = () => {
  const menu = useLoaderData() as MenuItemType[];

  return (
    <ul className='divide-y divide-stone-200 px-2'>
      {menu.map((menuItems: MenuItemType) => (
        <MenuItem menuItem={menuItems} key={menuItems.id} />
      ))}
    </ul>
  );
};

export const loader = async () => {
  const menu = await getMenu();
  return menu;
};

export default Menu;
