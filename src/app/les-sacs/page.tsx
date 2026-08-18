import type { Metadata } from "next";
import { getDepartment } from "@/lib/data/departments";
import { getProductsByDepartment } from "@/lib/shopify";
import { DepartmentTemplate } from "@/components/department/DepartmentTemplate";

const department = getDepartment("les-sacs");

export const metadata: Metadata = {
  title: department.frenchName,
  description: department.description,
  alternates: { canonical: "/les-sacs" },
};

export default async function Page() {
  const products = await getProductsByDepartment("les-sacs");
  return <DepartmentTemplate department={department} products={products} />;
}
