import CompanyCard from "./CompanyCard";
import { Company } from "@/lib/types";

export default function CompanyList({
  companies,
  isLoading,
  error,
}: {
  companies: Company[];
  isLoading: boolean;
  error: string | null;
}) {
  

  return (
    <div className="container mx-auto p-8 pt-24">
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {companies.length > 0 ? (
            companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))
          ) : (
            <p className="text-center col-span-full text-neutral-500">
              No companies found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
