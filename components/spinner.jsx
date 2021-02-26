import Image from 'next/image';

export  default  function Spinner({width = 45, height = 45}) {
    return <Image width={width} height={height}  src="/icons/spinner.svg" />
}
