"use client";

import { useState } from "react";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import FormPhoneInput from "./FormPhoneInput";
import ImageUploadButton from "./ImageUploadButton";

type CompanyFormProps = {
    onSubmit: (data: {
        name: string;
        description: string;
        phoneNumber: string;
        email: string;
        website?: string;
        rating?: number;
        priceRange?: string;
        tags: string[];
        profileImage: string;
    }) => void;
    loading: boolean;
    error: string | null;
    success: string | null;
};

const CompanyForm = ({
    onSubmit,
    loading,
    error,
    success,
}: CompanyFormProps) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [rating, setRating] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const [tags, setTags] = useState("");
    const [profileImage, setProfileImage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            name,
            description,
            phoneNumber,
            email,
            website,
            rating: rating ? Number(rating) : undefined,
            priceRange,
            tags: tags.split(","),
            profileImage,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <FormInput
                label="Company Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter the company name"
            />

            <FormTextarea
                label="Description *"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Enter a brief description of the company"
            />

            <FormPhoneInput
                value={phoneNumber}
                onChange={(value) => setPhoneNumber(value)} 
                placeholder="Enter phone number"
            />

            <FormInput
                label="Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="Enter your email address"
            />

            <FormInput
                label="Website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="Enter company website URL"
            />

            <ImageUploadButton onUpload={(url) => setProfileImage(url)} />

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
                {loading ? "Creating..." : "Create Company"}
            </button>

            {error && <p className="text-red-600 font-medium mt-2">{error}</p>}
            {success && <p className="text-green-600 font-medium mt-2">{success}</p>}
        </form>
    );
};

export default CompanyForm;
