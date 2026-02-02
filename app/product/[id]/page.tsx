import Box from '@/app/_components/Box';

export default async function ProductIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <Box />
      <div>ProductIdPage {id}</div>
    </>
  );
}
