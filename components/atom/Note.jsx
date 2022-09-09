function Note({ note, created_at }) {
  return (
		<div className='mt-3'>
			<p>{note}</p>
			<p className='text-zinc-500'>Created: {created_at}</p>
		</div>
  );
}

export default Note