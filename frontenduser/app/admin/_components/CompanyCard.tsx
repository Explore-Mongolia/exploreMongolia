import { Company } from "@/lib/types";

export default function CompanyCard({ company }: { company: Company }) {
  return (
    <div className="md:col-span-1 h-auto bg-neutral-100 dark:bg-neutral-800 flex flex-col p-4 rounded-lg shadow-sm relative">
 
      <img
        src={company.profileImage || "/default-avatar.png"} 
        alt={`${company.name} logo`}
        className="w-16 h-16 object-cover rounded-full absolute top-4 left-6 border"
      />
      <div className="mt-16 px-2">
        <h2 className="text-xl font-medium">{company.name}</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">
          {company.description}
        </p>
        <div className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
          <p className="mt-2">
            <strong>Email:</strong>{" "}
            {company.contact?.email || "N/A"}
          </p>
          <p className="mt-2">
            <strong>Phone:</strong>{" "}
            {company.contact?.phoneNumber || "N/A"}
          </p>
          {company.contact?.website && (
            <p className="mt-2">
              <strong>Website:</strong>{" "}
              <a href={company.contact.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {company.contact.website}
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
