import { Upload } from "lucide-react";

type Props = {
  onSelect: (file: File) => void;
};

export default function UploadCard({
  onSelect,
}: Props) {
  return (
    <div className="
      backdrop-blur-xl
      bg-white
      dark:bg-white/5
      border-2
      border-slate-300
      dark:border-white/10
      rounded-3xl
      p-8
      shadow-sm
    ">
      <label className="cursor-pointer flex flex-col items-center gap-4">

        <Upload size={40} />

        <span className="text-lg font-medium">
          Upload CSV Dataset
        </span>

        <input
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => {
            const file =
              e.target.files?.[0];

            if (file) {
              onSelect(file);
            }
          }}
        />

      </label>
    </div>
  );
}