"use client";
import { z } from "zod";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Formfield from "./Formfield";
import { Form } from "./ui/form";
import Image from "next/image";
import Link from "next/link";

const authSchema = (type: FormType) => {
  return z.object({
    username:
      type === "sign-up" ? z.string().min(3).max(12) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const formSchema = authSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const isSign = type === "sign-in";
  return (
    <div className="h-screen pt-20 flex justify-center bg-black text-white">
      <div className="h-1/2 px-4 py-2 lg:min-w-[500px] shadow-md rounded-md ">
        <div className="text-center text-5xl md:text-6xl">
          <div className="font-semibold">
            {isSign ? "Welcome Back To" : "Create an Account"}
          </div>
          <div className="flex justify-center items-center">
            <h1 className="font-bold cursor-pointer">Rapid Mail</h1>
            <Image src={"/rapid.png"} alt="train" height={105} width={105} />
          </div>
        </div>

        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {isSign && (
              <Formfield
                control={form.control}
                label="Username"
                placeholder="Your name"
                name="username"
                type="text"
              />
            )}

            <Formfield
              control={form.control}
              label="Email"
              placeholder="you@example.com"
              name="email"
              type="email"
            />

            <Formfield
              control={form.control}
              label="Password"
              placeholder="......"
              name="password"
              type="password"
            />

            <button
              type="submit"
              className="w-full flex justify-center items-center text-lg font-semibold rounded-md cursor-pointer gap-3 border px-4 py-2 hover:bg-slate-200 hover:text-black transition-all duration-200 active:scale-105"
            >
              {isSign ? "Login" : "Create an account"}
            </button>
          </form>
        </Form>

        <div className="w-full justify-between items-center flex my-5">
          <span className="flex-1 border" />
          <span className="mx-4">Or</span>
          <span className="flex-1 border" />
        </div>

        <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
          <button
            type="submit"
            className="w-full flex justify-center items-center text-lg font-semibold rounded-md cursor-pointer gap-3 border px-4 py-2 hover:bg-slate-200 hover:text-black transition-all duration-200 active:scale-105"
          >
            <Image src={"/google.png"} alt="google" height={35} width={35} />
            Sign in with Google
          </button>
        </form>
        <div className="text-center mt-4">
          {isSign ? "No account yet ?" : "Already have an account ?"}
          <Link
            href={!isSign ? "/sign-in" : "sign-up"}
            className="font-bold text-user-primary ml-1 hover:underline"
          >
            {!isSign ? "Sign in" : "Sign up"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
