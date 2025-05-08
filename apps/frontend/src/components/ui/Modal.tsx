import React from "react";

import { Feather, X } from "lucide-react";
import { Dialog } from "radix-ui";

type ModalProps = {
  title?: string;
  description?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Modal({
  title,
  description,
  open,
  setOpen,
  children,
}: React.PropsWithChildren<ModalProps>) {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="bg-primary text-primary-foreground hover:bg-primary/90 flex-center
          shadow-secondary fixed bottom-16 right-7 h-14 w-14 rounded-full
          shadow-[0px_1px_2px_1px] md:hidden"
      >
        <Feather />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-neutral-900/80" />

        <Dialog.Content
          className="bg-card-400 dark:bg-card fixed inset-0 m-auto h-[40vh] w-[90vw] max-w-[640px]
            rounded-lg p-8"
        >
          {children}

          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>
          <Dialog.Close
            aria-label="Close"
            className="text-background dark:text-foreground absolute right-0 top-0 translate-y-[-100%]
              p-4"
          >
            <X />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Modal;
