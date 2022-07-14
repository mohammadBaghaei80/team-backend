import { Module } from "@nestjs/common";
import { ConfigurationModule } from "./configuration/configuration.module";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from './schemas/auth/auth.module';
import { PlayerModule } from './schemas/players/player.module';
import { GameModule } from './schemas/games/game.module';
import { StandingsModule } from './schemas/standings/standings.module';

@Module({
  imports: [ConfigurationModule, DatabaseModule, AuthModule, PlayerModule, GameModule, StandingsModule]
})
export class AppModule {
}
