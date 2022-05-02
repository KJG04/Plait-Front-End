import gsap, { Power4 } from "gsap";
import {
  forwardRef,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import OutsideClickHandler from "react-outside-click-handler";
import * as S from "./styles";

interface PropsType {
  children?: ReactNode;
}

export interface ModalPortalRef {
  open: () => void;
  close: () => void;
}

const ModalPortal = forwardRef<ModalPortalRef, PropsType>(
  ({ children }, ref) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);

    const element =
      typeof window !== "undefined" && document.getElementById("modal");

    const open = useCallback(() => {
      setIsOpen(true);
    }, []);

    const close = useCallback(() => {
      setIsOpen(false);
    }, []);

    useImperativeHandle(ref, () => ({ open, close }));

    const renderModal = useMemo(
      () => (
        <S.Container>
          <S.Backdrop ref={backdropRef} />
          <OutsideClickHandler onOutsideClick={close}>
            <div ref={containerRef}>{children}</div>
          </OutsideClickHandler>
        </S.Container>
      ),
      [children, close],
    );

    const openAnim = useCallback(() => {
      if (!containerRef.current || !backdropRef.current) {
        return;
      }

      if (!isOpen) {
        return;
      }

      gsap.from(containerRef.current, {
        duration: 0.5,
        scale: 0.8,
        opacity: 0,
        ease: Power4.easeOut,
      });
      gsap.from(backdropRef.current, {
        duration: 0.5,
        opacity: 0,
        ease: Power4.easeOut,
      });
    }, [isOpen]);

    useEffect(() => {
      openAnim();
    }, [openAnim]);

    if (!element || !isOpen) {
      return <></>;
    }

    return createPortal(renderModal, element);
  },
);

ModalPortal.displayName = "ModalPortal";

export default memo(ModalPortal);
