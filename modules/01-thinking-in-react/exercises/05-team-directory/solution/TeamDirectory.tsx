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

// Data shaping lives in a plain function, outside any component. It's pure,
// so it's trivial to test and safe to call during render.
export function groupByDepartment(members: Member[]): DepartmentGroup[] {
  // Map.groupBy (ES2024) builds a new Map without touching `members`,
  // and Maps iterate in insertion order (= first appearance).
  const groups = Map.groupBy(members, (member) => member.department)
  return Array.from(groups, ([department, members]) => ({ department, members }))
}

// The hierarchy mirrors the mockup's boxes: each component does one thing.

function MemberRow({ member }: { member: Member }) {
  return (
    <li>
      <span>
        <strong>{member.name}</strong> · {member.role}
      </span>
      {member.onCall && <span className="on-call">On call</span>}
    </li>
  )
}

function DepartmentSection({ group }: { group: DepartmentGroup }) {
  return (
    <section>
      <h2>
        {group.department} ({group.members.length})
      </h2>
      <ul>
        {group.members.map((member) => (
          <MemberRow key={member.id} member={member} />
        ))}
      </ul>
    </section>
  )
}

export function TeamDirectory({ members }: { members: Member[] }) {
  // Grouping is *derived* from props during render. We don't store it anywhere,
  // so it can never get out of sync with `members`.
  const groups = groupByDepartment(members)

  return (
    <div className="directory">
      <p>
        {members.length} people across {groups.length} departments
      </p>
      {groups.map((group) => (
        // Department names are unique within the list, so they make a fine key.
        <DepartmentSection key={group.department} group={group} />
      ))}
    </div>
  )
}
