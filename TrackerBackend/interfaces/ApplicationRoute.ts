import {Application} from 'express';
export interface ApplicationRoute{
  initializeRouter(expressApplication: Application):void
}
