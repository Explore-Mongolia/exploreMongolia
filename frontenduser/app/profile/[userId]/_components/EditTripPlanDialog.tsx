import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { useState, useEffect } from "react";
  import { TripPlan } from "@/lib/types";
  import { sendRequest } from "@/lib/SendRequest";
  import { toast } from "sonner";
  
  interface Props {
    open: boolean;
    onClose: () => void;
    tripPlan: TripPlan | null;
    onUpdate: (updated: TripPlan) => void;
  }
  
  interface Accommodation {
    name: string;
    address: string;
  }
  
  export default function EditTripPlanDialog({
    open,
    onClose,
    tripPlan,
    onUpdate,
  }: Props) {
    const [title, setTitle] = useState("");
    const [destinations, setDestinations] = useState("");
    const [transportation, setTransportation] = useState("");
    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
    const [isPublic, setIsPublic] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
  
    useEffect(() => {
      if (tripPlan) {
        setTitle(tripPlan.title || "");
        setDestinations(tripPlan.destinations?.join(", ") || "");
        setTransportation(tripPlan.transportation || "");
        setAccommodations(tripPlan.accommodations || []);
        setIsPublic(tripPlan.isPublic ?? false);
      }
    }, [tripPlan]);
  
    const handleAccommodationChange = (
      index: number,
      field: keyof Accommodation,
      value: string
    ) => {
      const updated = [...accommodations];
      updated[index][field] = value;
      setAccommodations(updated);
    };
  
    const handleAddAccommodation = () => {
      setAccommodations([...accommodations, { name: "", address: "" }]);
    };
  
    const handleRemoveAccommodation = (index: number) => {
      setAccommodations(accommodations.filter((_, i) => i !== index));
    };
  
    const handleSave = async () => {
        setIsSaving(true);
        try {
          const res = await sendRequest.put(`/ai/trip/${tripPlan?._id}`, {
            title,
            destinations: destinations
              .split(",")
              .map((d) => d.trim())
              .filter(Boolean),
            transportation,
            accommodations: accommodations.map((a) => ({
              name: a.name.trim(),
              address: a.address.trim(),
            })),
            isPublic,
          });
      
          toast.success("Trip plan updated.");
          onUpdate(res.data);
        } catch (err) {
          console.error(err);
          toast.error("Failed to update trip plan.");
        } finally {
          setIsSaving(false);
        }
      };
      
  
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Trip Plan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <input
              autoFocus
              className="w-full border p-2 rounded"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
  
            <input
              className="w-full border p-2 rounded"
              placeholder="Destinations (comma separated)"
              value={destinations}
              onChange={(e) => setDestinations(e.target.value)}
            />
  
            <input
              className="w-full border p-2 rounded"
              placeholder="Transportation"
              value={transportation}
              onChange={(e) => setTransportation(e.target.value)}
            />
  
            <div className="space-y-2">
              <label className="font-medium text-sm">Accommodations</label>
              {accommodations.map((acc, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    className="w-1/2 border p-2 rounded"
                    placeholder="Name"
                    value={acc.name}
                    onChange={(e) =>
                      handleAccommodationChange(index, "name", e.target.value)
                    }
                  />
                  <input
                    className="w-1/2 border p-2 rounded"
                    placeholder="Address"
                    value={acc.address}
                    onChange={(e) =>
                      handleAccommodationChange(index, "address", e.target.value)
                    }
                  />
                  <button
                    className="text-red-500 text-sm"
                    onClick={() => handleRemoveAccommodation(index)}
                    type="button"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <Button
                variant="secondary"
                className="w-full"
                onClick={handleAddAccommodation}
                type="button"
              >
                Add Accommodation
              </Button>
            </div>
  
            <div className="flex items-center gap-2">
              <input
                id="public"
                type="checkbox"
                checked={isPublic}
                onChange={() => setIsPublic(!isPublic)}
              />
              <label htmlFor="public" className="text-sm">
                Make this trip plan public
              </label>
            </div>
  
            <Button
              className="w-full"
              onClick={handleSave}
              disabled={isSaving}
              type="button"
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  