import { redirect } from "next/navigation";

const EmptySearchPage = async () => {
  redirect("/");
};

export default EmptySearchPage;
