import React from "react";

import { Feather, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
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
  const dropInVariants = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    enter: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 400,
        duration: 0.3,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="bg-primary text-primary-foreground hover:bg-primary/90 flex-center
          shadow-elevation-medium shadow-primary-700 fixed bottom-16 right-7 h-14 w-14
          rounded-full md:hidden"
      >
        <Feather />
      </Dialog.Trigger>

      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild className="fixed inset-0 bg-neutral-900/80">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              ></motion.div>
            </Dialog.Overlay>

            <Dialog.Content
              asChild
              className="bg-card-400 dark:bg-card fixed inset-0 bottom-[30%] m-auto h-[40vh] w-[90vw]
                max-w-[640px] rounded-lg p-8"
            >
              <motion.div
                variants={dropInVariants}
                initial="hidden"
                animate="enter"
                exit="exit"
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
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

export default Modal;
