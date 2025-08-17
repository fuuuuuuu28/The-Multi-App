import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";

interface NewSong {
  title: string;
  artist: string;
}

interface Files {
  audio: File | null;
  image: File | null;
}

const AddSongs = () => {
  const [newSong, setNewSong] = useState<NewSong>({ title: "", artist: "" });

  const [files, setFiles] = useState<Files>({ audio: null, image: null });
  const [isLoading, setIsLoading] = useState(false);


  const audioInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (!files.audio || !files.image) {
        alert("Please upload all files");
      }
      const formData = new FormData();
      formData.append("title", newSong.title);
      formData.append("artist", newSong.artist);
      if (files.audio && files.image) {
        formData.append("audioFile", files.audio);
        formData.append("imageFile", files.image);
      }

      await axiosInstance.post("/songs/createSong", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("form: ", formData);

      setNewSong({ title: "", artist: "" });
      setFiles({ audio: null, image: null });
      alert("Song added successfully");
    } catch (error) {
      throw new Error("Failed to add song: " + error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"outline"} className="cursor-pointer">
          <Plus />
          <h1>Add Song</h1>
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[90%] w-[500px] bg-white/90 ">
        <DialogHeader>
          <DialogTitle> Add New Song</DialogTitle>
          <DialogDescription>Thêm bài hát mới vào thư viện</DialogDescription>
        </DialogHeader>
        <div className="space-y-5">
          <input
            type="file"
            accept="audio/*"
            ref={audioInputRef}
            hidden
            onChange={(e) =>
              setFiles((prev) => ({
                ...prev,
                audio: e.target.files![0],
              }))
            }
          />
          <input
            type="file"
            accept="image/*"
            ref={imageInputRef}
            hidden
            onChange={(e) =>
              setFiles((prev) => ({
                ...prev,
                image: e.target.files![0],
              }))
            }
          />

          <div
            className="h-[150px] flex flex-col justify-center items-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => imageInputRef.current?.click()}
          >
            <div className="flex flex-col items-center justify-center p-12 space-y-5">
              {files.image ? (
                <>
                  <div className="text-center">
                    <h1 className="font-semibold">Image selected:</h1>
                    <p className="">{files.image.name.slice(0, 20)} </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-gray-500 rounded-full p-3">
                    <Upload className="size-7 " />
                  </div>
                  <h1>Upload artwork</h1>
                </>
              )}
            </div>
          </div>

          <div
            className="hover:bg-gray-600 duration-100"
            onClick={() => audioInputRef.current?.click()}
          >
            <Button variant={"outline"} className="w-full cursor-pointer">
              {files.audio
                ? files.audio.name.slice(0, 20)
                : "Choose Audio File"}
            </Button>
          </div>

          <div className="">
            <label className="text-sm font-medium">Title</label>
            <Input
              placeholder="Title..."
              value={newSong.title}
              onChange={(e) =>
                setNewSong({ ...newSong, title: e.target.value })
              }
            />
          </div>

          <div className="">
            <label className="text-sm font-medium">Artist</label>
            <Input
              placeholder="Artist..."
              value={newSong.artist}
              onChange={(e) =>
                setNewSong({ ...newSong, artist: e.target.value })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            className="bg-gradient-to-tr from-green-500 to-teal-500 text-white cursor-pointer"
            onClick={handleSubmit}
          >
            {isLoading ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSongs;
