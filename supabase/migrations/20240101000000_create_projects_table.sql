-- Create Projects table
create table if not exists public.projects (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.projects enable row level security;

-- Create policy to allow public read access
create policy "Allow public read access"
    on public.projects
    for select
    to public
    using (true);

-- Create policy to allow authenticated users to create projects
create policy "Allow authenticated users to create projects"
    on public.projects
    for insert
    to authenticated
    with check (true);

-- Set up updated_at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger handle_updated_at
    before update on public.projects
    for each row
    execute procedure public.handle_updated_at(); 