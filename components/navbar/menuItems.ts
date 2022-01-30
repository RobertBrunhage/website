export interface NavItem {
  title: string,
  url: string | string[],
}

const NavItems: NavItem[] = [
  { title: "Home", url: "/" },
  { title: "Course", url: "/course" },
  { title: "Tutorials", url: ["/videos", "/articles"] },
];

export default NavItems;
