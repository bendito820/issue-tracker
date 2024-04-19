"use client";

import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUSers();

  if (isLoading) return <Skeleton />;

  if (error) return null;

  const assignIssue = async (userId: string) => {
    await axios
      .patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId === "unassign" ? null : userId,
      })
      .catch(() => {
        toast.error("Changes Could Not be saved.");
      });
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "unassign"}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assign..." />

        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassign">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUSers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, //60s,
    retry: 3,
  });

export default AssigneeSelect;
