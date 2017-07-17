export class Goal{

  public    id:               number;
  public    title:            string;
  public    description:      string;
  public    points :          number;
  public    dueDate:          Date|null;
  public    finished :        Date|null;
  public    completed:        boolean;
  public    icon:             string|null;
  public    createdAt:        Date;
  public    updatedAt:        Date;

  public    parentPcs:              number;
  public    category:         number;

  public constructor(args? : any){
    this.id = args.id;
    this.title = args.title;
    this.description = args.description;
    this.points = args.points;
    this.dueDate = args.dueDate;
    this.finished = args.finished;
    this.completed = args.completed;
    this.icon = args.icon;
  }
}
