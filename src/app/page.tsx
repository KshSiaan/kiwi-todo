"use client";
import { Gauge } from "@/components/gauge";
import LabelInput from "@/components/label-input";
import { PopButton } from "@/components/pop-button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import db from "@/lib/db";
import { cn } from "@/lib/utils";
import { useLiveQuery } from "dexie-react-hooks";
import { CheckIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const todoset = useLiveQuery(() => db.todos.toArray(), []) || [];
  const [text, setText] = useState("");
  const handleAddTodo = async () => {
    if (!text || text === "") {
      return;
    }
    try {
      await db.todos.add({
        name: text,
        completed: false,
        createdAt: new Date(),
        completedAt: undefined,
      });
      toast.success("TODO added successfully");
      setText("");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await db.todos.delete(id);
      toast.success("TODO deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleCompleteTodo = async (id: number) => {
    try {
      const todo = await db.todos.get(id);
      if (!todo) return;
      await db.todos.update(id, {
        completed: true,
        completedAt: new Date(),
      });
      toast.success("TODO marked as completed");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <main className="w-full max-w-4xl mx-auto border bg-background min-h-dvh">
      <div className="p-3 border-b flex items-center justify-between">
        <h1 className="text-sm font-black">KIWI - TODO</h1>
        <div className="">
          <Gauge
            value={
              (todoset.filter((t) => t.completed).length /
                (todoset.length || 1)) *
              100
            }
            className={"size-8"}
          />
        </div>
      </div>
      <div className="p-6 flex gap-4">
        <LabelInput
          placeholder="Write your TODO..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTodo();
            }
          }}
        />
        <PopButton onClick={handleAddTodo}>Add</PopButton>
      </div>
      <div className="p-6 border-t space-y-3">
        {todoset.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center">
            No TODOs found. Add a new one!
          </p>
        ) : (
          [...todoset].reverse().map((todo) => (
            <div
              key={todo.id}
              className="border p-4 rounded w-full flex items-center justify-between"
            >
              <h4
                className={cn(
                  "text-sm ",
                  todo.completed
                    ? "text-muted-foreground line-through font-light"
                    : "font-semibold",
                )}
              >
                {todo.name}
              </h4>
              <div className="flex items-center gap-2">
                <Button
                  size={"icon-sm"}
                  className="border-emerald-600 text-emerald-600"
                  variant={"outline"}
                  disabled={todo.completed}
                  onClick={() => handleCompleteTodo(todo.id)}
                >
                  <CheckIcon />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size={"icon-sm"}
                      className="border-destructive text-destructive"
                      variant={"outline"}
                    >
                      <Trash2Icon />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete this TODO?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteTodo(todo.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
