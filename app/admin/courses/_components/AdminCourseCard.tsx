import { AdminCourseType } from "@/app/data/admin/admin-get-courses";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useConstructUrl } from "@/hooks/use-construct";
import { ArrowRight, School, TimerIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
  data: AdminCourseType;
}

export function AdminCourseCard({ data }: iAppProps) {
  const thumbnailUrl = useConstructUrl(data.fileKey);

  return (
    <Card className="group relative py-0 gap-0">
      {/* absolute dropdown */}
      <div></div>

      <Image
        src={thumbnailUrl}
        alt={data.title}
        width={600}
        height={400}
        className="w-full rounded-t-lg aspect-video h-full object-cover"
      />

      <CardContent className="p-4">
        <Link
          href={`/admin/courses/${data.id}`}
          className="font-medium text-lg line-clamp-2 group-hover:text-primary transition-colors hover:underline"
        >
          {data.title}
        </Link>

        <p className="line-clamp-2 text-sm text-muted-foreground leading-tight mt-2">
          {data.smallDescription}
        </p>

        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <TimerIcon className="size-6 p-1 rounded-md text-primary bg-primary/10" />

            <p className="text-sm text-muted-foreground">{data.duration}h</p>
          </div>
          <div className="flex items-center gap-x-2">
            <School className="size-6 p-1 rounded-md text-primary bg-primary/10" />

            <p className="text-sm text-muted-foreground">{data.level}</p>
          </div>
        </div>

        <Link
          className={buttonVariants({
            className: "w-full mt-4",
          })}
          href={`/admin/courses/${data.id}/edit`}
        >
          Edit Course <ArrowRight className="size-4 " />
        </Link>
      </CardContent>
    </Card>
  );
}
