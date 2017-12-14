export default interface Step {
    id: number,
    title: string,
    body: string,
    true_id?: number,
    false_id?: number
  }