/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
  } from "@/components/ui/pagination";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { useAppSelector } from "@/redux/api/hook";
import { useGetAllBookingsQuery } from "@/redux/feature/Bookings/bookingApi";
import { useState } from "react";
 
  
  const BookingManagement = () => {
    const { user } = useAppSelector((state) => state?.user);
    const token = user?.token;
    const [page,setPage] = useState(1)
 
    
    const { data: bookings } = useGetAllBookingsQuery({
      token:token,
      args: [
        { name: "page", value: page },
        { name: "limit", value: "4" },
        { name: "sort", value: 'name' },
      ],
    },{
      pollingInterval: 1000,
    });
 
  
  const handlePaginatePrev = () =>{
    setPage(page - 1)
   }
 
  
  const handlePaginateNext = () =>{
    if (bookings?.data?.hasMore) {
      setPage(page + 1)
    }
    
   }
  
    return (
      <div className="sm:px-6 lg:px-20 mt-20 md:mt-28 ">
        <div className="flex sm:flex-col md:flex-row justify-between items-center mb-10 border rounded-md p-2">
          <div className="lg:text-2xl font-semibold text-gray-700 flex justify-center items-center gap-2">
            <span className="text-[#12143D]">
              Booking <span className="text-[#F7A400] ps-2"> Management</span>
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 text-[#F7A400]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </span>
          </div>
          
        </div>
        <div className="bg-[#fbfcfd] shadow-sm min-h-[40vh]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-start">Appoint Date</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings?.data?.facility?.map((item: any) => (
                <TableRow key={item?._id}>
                  <TableCell className="font-bold text-balance text-[#262626e5] w-[22%] bg-[#EBF5FB] rounded-br-full">
                    {item?.user?.name}
                  </TableCell>
                  <TableCell>
                    <img
                      className="size-8 rounded-xl"
                      src={item?.facility?.image}
                      alt="product"
                    />
                  </TableCell>
                  <TableCell>
                    <span className="text-green-500 font-semibold">$</span>{" "}
                    {item?.payableAmount} Pre-hour
                  </TableCell>
                  <TableCell>
                    {item?.startTime} to {item?.endTime}
                  </TableCell>
                  <TableCell>
                    {new Date(item?.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-row justify-center items-center gap-2">
                      <span
                        className={`text-green-500 font-semibold ${
                          item?.isBooked != "confirmed" && "text-red-500"
                        }`}
                      >
                        {item?.isBooked}
                      </span>
                    </div>
                  </TableCell>
  
                  <TableCell>
                    <div className="font-bold text-balance text-[#262626e5] bg-[#EBF5FB] py-2 flex justify-center items-center rounded-md">
          
                      <button className="">User-info</button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="pt-8 ">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <button
                className={`${
                  page === 1
                   ? "bg-gray-300 md:px-6 md:py-3 sm:py-2 px-3 text-sm rounded-full text-gray-100"
                   : "bg-white md:px-6 md:py-3 sm:py-2 px-3 text-sm text-black font-semibold rounded-full"
                } `}
               onClick={() => handlePaginatePrev()}
               disabled={page === 1}
                >
                  Previous
                </button>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">{}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  {page}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">{}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
              <button
               className={`${
                 !bookings?.data?.hasMore
                   ? "bg-gray-300 md:px-6 md:py-3 sm:py-2 px-3 text-sm rounded-full text-gray-100"
                   : "bg-white md:px-6 md:py-3 sm:py-2 px-3 text-sm text-black font-semibold rounded-full"
               } `}
               onClick={handlePaginateNext}
                disabled={!bookings?.data?.hasMore}
                >
                  Next
                </button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    );
  };
  
  export default BookingManagement;
