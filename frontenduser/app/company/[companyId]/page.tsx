"use client";

import { useParams } from "next/navigation";
import { useCompany } from "@/hooks/useCompany";
import Image from "next/image";
import CompanySkeleton from "./_components/Skeleton";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function CompanyPage() {
  const { companyId } = useParams();
  const id = Array.isArray(companyId) ? companyId[0] : companyId;
  const router = useRouter();

  const { data, isLoading, error } = useCompany(id as string);

  if (isLoading) return <CompanySkeleton />;

  if (error || !data?.company)
    return (
      <p className="text-center text-red-500 mt-10">
        Error loading company data
      </p>
    );

  const company = data.company;

  return (
    <div className="p-4 sm:p-6 mt-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.back()}
        className="flex items-center gap-2 group transition-all"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span className="text-sm font-medium">Back</span>
      </Button>

      <div className="max-w-4xl mx-auto p-6 sm:p-10 space-y-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <Image
            src={company.profileImage}
            alt={company.name}
            width={100}
            height={100}
            className="rounded-full object-cover border border-gray-300"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
            <p className="text-gray-600 text-sm mt-1">
              Trusted travel provider
            </p>
          </div>
        </div>

        <p className="text-gray-700 text-base leading-relaxed">
          {company.description}
        </p>
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm space-y-2">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Contact Information
          </h2>
          <p className="text-gray-700">
            📞 <span className="font-medium">Phone:</span>{" "}
            {company.contact?.phoneNumber ?? "N/A"}
          </p>
          <p className="text-gray-700">
            📧 <span className="font-medium">Email:</span>{" "}
            {company.contact?.email ?? "N/A"}
          </p>
          <p className="text-gray-700">
            🌐 <span className="font-medium">Website:</span>{" "}
            {company.contact?.website ? (
              <a
                href={company.contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {company.contact.website}
              </a>
            ) : (
              "N/A"
            )}
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Destinations by {company.name}
          </h2>
          {company.destinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {company.destinations.map((destination: any) => (
                <div
                  key={destination._id}
                  className="p-4 border rounded-lg shadow-sm bg-white cursor-pointer"
                  onClick={() => router.push(`/destination/${destination._id}`)}
                >
                  <div className="relative w-full h-40 mb-4">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {destination.name}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {destination.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No destinations listed yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
