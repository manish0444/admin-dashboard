import React, { useState } from "react";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface CollectionType {
  _id: string;
  title: string;
}

interface MultiSelectProps {
  placeholder: string;
  collections?: CollectionType[]; // Make collections optional
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  collections = [], // Provide a default empty array if collections is not provided
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  // Ensure collections is always an array
  const selected = value.map((id) =>
    collections.find((collection) => collection._id === id)
  ) as CollectionType[];

  const selectables = collections.filter(
    (collection) => !selected.some((s) => s._id === collection._id)
  );

  return (
    <div className="overflow-visible bg-white"> {/* Removed Command wrapper */}
      <div className="flex gap-1 flex-wrap border rounded-md">
        {selected.map((collection) => (
          <Badge key={collection._id}>
            {collection.title}
            <button
              type="button"
              className="ml-1 hover:text-red-1"
              onClick={() => onRemove(collection._id)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}

        <input
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
        />
      </div>

      <div className="relative mt-2">
        {open && (
          <div className="absolute w-full z-30 top-0 overflow-auto border rounded-md shadow-md">
            {selectables.map((collection) => (
              <div
                key={collection._id}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onChange(collection._id);
                  setInputValue("");
                }}
                className="hover:bg-grey-2 cursor-pointer"
              >
                {collection.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
