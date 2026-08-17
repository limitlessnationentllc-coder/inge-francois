import type { Metadata } from "next";
import { getDepartment } from "@/lib/data/departments";
import { getProductsByDepartment } from "@/lib/shopify";
import { DepartmentTemplate } from "@/components/department/DepartmentTemplate";

const department = getDepartment("originals");

export const metadata: Metadata = {
  title: department.frenchName,
  description: department.description,
};

export default async function Page() {
  const products = await getProductsByDepartment("originals");
  return <DepartmentTemplate department={department} products={products} />;
}
