import { useModal } from '@/shared/hooks/use-modal-store';

export default function Home() {
  const { onOpen } = useModal();

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-y-5">
      <button
        className="rounded-md border border-black p-1"
        onClick={() => onOpen('follow')}
      >
        초대 모달
      </button>
      <button
        className="rounded-md border border-black p-1"
        onClick={() => onOpen('compare')}
      >
        비교 모달
      </button>
      <button
        className="rounded-md border border-black p-1"
        onClick={() => onOpen('compareConfirm')}
      >
        비교 확인 모달
      </button>
      <button
        className="rounded-md border border-black p-1"
        onClick={() => {
          onOpen('review');
        }}
      >
        리뷰 모달
      </button>
      <button
        className="rounded-md border border-black p-1"
        onClick={() => {
          onOpen('itemEdit');
        }}
      >
        상품 편집 모달
      </button>
      <button
        className="rounded-md border border-black p-1"
        onClick={() => {
          onOpen('itemAdd');
        }}
      >
        상품 추가 모달
      </button>
    </div>
  );
}
