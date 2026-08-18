import type { Metadata } from "next";
import { getDepartment } from "@/lib/data/departments";
import { getProductsByDepartment } from "@/lib/shopify";
import { DepartmentTemplate } from "@/components/department/DepartmentTemplate";

const department = getDepartment("la-femme");

export const metadata: Metadata = {
  title: department.frenchName,
  description: department.description,
  alternates: { canonical: "/la-femme" },
};

export default async function Page() {
  const products = await getProductsByDepartment("la-femme");
  return <DepartmentTemplate department={department} products={products} />;
}
