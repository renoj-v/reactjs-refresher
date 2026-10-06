export type Member = {
  id: string
  name: string
  role: string
  department: string
  onCall?: boolean
}

export type DepartmentGroup = {
  department: string
  members: Member[]
}

export function groupByDepartment(members: Member[]): DepartmentGroup[] {
  // TODO: group by department, preserving first-appearance order. Don't mutate `members`.
  return []
}

// TODO: create a `MemberRow` component (name · role, plus an "On call" badge when needed).

// TODO: create a `DepartmentSection` component (<section> + <h2>Department (count)</h2> + list of MemberRows).

export function TeamDirectory({ members }: { members: Member[] }) {
  // TODO: summary line "N people across M departments", then one DepartmentSection per group.
  return (
    <div>
      {members.map((member) => (
        <p key={member.id}>{member.name}</p>
      ))}
    </div>
  )
}
