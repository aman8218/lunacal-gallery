import { question, apps } from './../../utils/Icons';

export default function Sidebar() {
  return (
    <>
      <div className="bg-[#363c43] w-1/4.5 h-full flex flex-col  p-4 text-[#a3adb2] rounded-xl">
        <div className='bg-[#363c43]'>{question}</div>
        <div className='mt-24 bg-[#363c43]'>{apps}</div>
      </div>
    </>
  );
}
