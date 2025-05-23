// models/User.ts

export class User {
  private id?: number;
  private name: string;
  private email: string;
  private password: string;
  private type: "normal" | "pro";

  constructor(
    name: string,
    email: string,
    password: string,
    type: "normal" | "pro",
    id?: number
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
    this.id = id;
  }

  getId(): number | undefined {
    return this.id;
  }

  setId(id: number): void {
    this.id = id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  isPro(): boolean {
    return this.type === "pro";
  }

  getType(): "normal" | "pro" {
    return this.type;
  }
}