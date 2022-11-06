export interface NavItem {
  title: string;
  url: string;
}

const NavItems: NavItem[] = [
  { title: "Home", url: "/" },
  { title: "Course", url: "/course" },
  { title: "Courses", url: "/courses" },
  { title: "Videos", url: "/videos" },
  { title: "Articles", url: "/articles" },
];

export default NavItems;
