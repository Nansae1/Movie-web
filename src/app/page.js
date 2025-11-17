"use client";
import Image from "next/image";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MovieSection } from "./_components/MovieSection";

const slideimg = ["/wicked.jpg", "/movie2.png", "/movie3.jpg"];

const moviesections = [
  {
    title: "Upcoming",
    movies: [
      { img: "./christmas.jpg", rate: "6.9/10", title: "Dear Santa" },
      {
        img: "./dragon.jpg",
        rate: "6.9/10",
        title: "How To Train Your Dragon Live Action",
      },
      { img: "./alien.jpg", rate: "6.9/10", title: "Alien Romulus" },
      { img: "./ashes.jpg", rate: "6.9/10", title: "From the Ashes" },
      {
        img: "./spacedog.jpg",
        rate: "6.9/10",
        title: "Space Dogg",
      },
      {
        img: "./Slide 4_3 - 1.png",
        rate: "6.9/10",
        title: "The Order",
      },
      {
        img: "./Slide 4_3 - 1 (1).png",
        rate: "6.9/10",
        title: "Y2K",
      },
      {
        img: "./Slide 4_3 - 1 (2).png",
        rate: "6.9/10",
        title: "Solo Leveling: ReAwakening",
      },
      {
        img: "./Slide 4_3 - 1 (3).png",
        rate: "6.9/10",
        title: "Get Away",
      },
      {
        img: "./Slide 4_3 - 1 (4).png",
        rate: "6.9/10",
        title: "Sonic the Hedgehog 3",
      },
    ],
  },
  {
    title: "Popular",
    movies: [
      {
        img: "/shawshank.jpg",
        rate: "9.3/10",
        title: "The Shawshank Redemption",
      },
      {
        img: "./Slide 4_3 - 1 (5).png",
        rate: "6.9/10",
        title: "How To Train Your Dragon Live Action",
      },

      {
        img: "./Slide 4_3 - 1 (6).png",
        rate: "6.9/10",
        title: "Alien Romulus",
      },
      {
        img: "./Slide 4_3 - 1 (13).png",
        rate: "6.9/10",
        title: "From the Ashes",
      },
      {
        img: "./Slide 4_3 - 1 (7).png",
        rate: "6.9/10",
        title: "From the Ashes",
      },
      {
        img: "./Slide 4_3 - 1 (8).png",
        rate: "6.9/10",
        title: "Space Dogg",
      },
      {
        img: "./Slide 4_3 - 1 (9).png",
        rate: "6.9/10",
        title: "The Order",
      },
      {
        img: "./Slide 4_3 - 1 (10).png",
        rate: "6.9/10",
        title: "Y2K",
      },
      {
        img: "./Slide 4_3 - 1 (11).png",
        rate: "6.9/10",
        title: "Solo Leveling: ReAwakening",
      },
      {
        img: "./Slide 4_3 - 1 (12).png",
        rate: "6.9/10",
        title: "Get Away",
      },
    ],
  },
  {
    title: "Top Rated",
    movies: [
      { img: "./christmas.jpg", rate: "6.9/10", title: "Dear Santa" },
      {
        img: "./dragon.jpg",
        rate: "6.9/10",
        title: "How To Train Your Dragon Live Action",
      },
      { img: "./alien.jpg", rate: "6.9/10", title: "Alien Romulus" },
      { img: "./ashes.jpg", rate: "6.9/10", title: "From the Ashes" },
      {
        img: "./spacedog.jpg",
        rate: "6.9/10",
        title: "Space Dogg",
      },
      {
        img: "./Slide 4_3 - 1.png",
        rate: "6.9/10",
        title: "The Order",
      },
      {
        img: "./Slide 4_3 - 1 (1).png",
        rate: "6.9/10",
        title: "Y2K",
      },
      {
        img: "./Slide 4_3 - 1 (2).png",
        rate: "6.9/10",
        title: "Solo Leveling: ReAwakening",
      },
      {
        img: "./Slide 4_3 - 1 (3).png",
        rate: "6.9/10",
        title: "Get Away",
      },
      {
        img: "./Slide 4_3 - 1 (4).png",
        rate: "6.9/10",
        title: "Sonic the Hedgehog 3",
      },
    ],
  },
];

export default function Home() {
  const plugin = React.useRef(
    Autoplay({ delay: 1500, stopOnInteraction: true })
  );
  return (
    <div className="h-screen w-screen flex flex-col items-center">
      <div className="flex flex-col gap-6 w-screen justify-center items-center">
        <div className="flex w-full justify-between max-w-360 h-15 items-center ">
          <img src="./Logo.png" className="h-5 w-23"></img>
          <div className="flex gap-3 items-center">
            <Select className="h-9 w-24.25">Genre</Select>
            <Input className="h-9 w-94.75" placeholder="Search.."></Input>
          </div>
          <img src="./Modes.png" className="h-9 w-9"></img>
        </div>
        <Carousel
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          className="w-full max-w-360 h-150 relative"
        >
          <CarouselContent>
            {Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem key={index}>
                <div>
                  <Card className="border-none py-0">
                    <CardContent
                      className="flex w-full h-150 bg-center bg-cover"
                      style={{ backgroundImage: `url(${slideimg[index]})` }}
                    >
                      <div className="h-66 w-101 mx-35 my-46 gap-4">
                        <div className="flex flex-col">
                          <p className="text-base text-white">Now Playing:</p>
                          <p className="text-4xl text-white">Wicked</p>
                          <p className="text-base text-white">6.9/10</p>
                        </div>
                        <div className="my-4 flex flex-col gap-4">
                          <p className="text-xs text-white w-75.5">
                            Elphaba, a misunderstood young woman because of her
                            green skin, and Glinda, a popular girl, become
                            friends at Shiz University in the Land of Oz. After
                            an encounter with the Wonderful Wizard of Oz, their
                            friendship reaches a crossroads.{" "}
                          </p>
                          <Button className="text-sm w-36 h-10 bg-white text-black">
                            Watch Trailer
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="h-10 w-10 flex justify-center items-center absolute top-70 left-11" />
          <CarouselNext className="h-10 w-10 flex justify-center items-center absolute top-70 right-11" />
        </Carousel>
      </div>
      <div className="w-screen flex flex-col gap-13 my-7">
        {moviesections.map((s) => {
          return (
            <MovieSection key={s.title} title={s.title} movies={s.movies} />
          );
        })}
      </div>
      <div className="w-full max-w-360 h-70 bg-[#4338CA] flex gap-122.25 my-7">
        <div className="flex flex-col gap-3">
          <div className="flex">
            <img src="./Vector (7).png" className="h-5 w-5"></img>
            <p className="text-white">Movie Z</p>
          </div>
          <p className="text-white">© 2024 Movie Z. All Rights Reserved.</p>
        </div>
        <div className="flex gap-24">
          <div className="flex flex-col">
            <div className="text-white">Contact Information</div>
            <div className="flex">
              <img className="" src="./Wifi icon.png"></img>
              <div className="flex flex-col">
                <p className="text-white">Email:</p>
                <p className="text-white">support@movieZ.com</p>
              </div>
            </div>
            <div>
              <img></img>
              <div className="flex flex-col">
                <p className="text-white">Phone:</p>
                <p className="text-white">+976 (11) 123-4567</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-white">Follow us </div>
            <div className="flex">
              <p className="text-white">Facebook</p>
              <p className="text-white">Instagram</p>
              <p className="text-white">Twitter</p>
              <p className="text-white">Youtube</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
