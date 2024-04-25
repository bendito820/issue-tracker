"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);

  const chagePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };
  if (pageCount <= 1) return null;
  return (
    <Flex align={"center"} gap={"2"}>
      <Text size={"2"}>
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        onClick={() => chagePage(1)}
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        onClick={() => chagePage(currentPage - 1)}
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        onClick={() => chagePage(currentPage + 1)}
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        onClick={() => chagePage(pageCount)}
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
