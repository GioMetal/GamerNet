package com.nullsoft.GamerNet.timeline;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="tlentity")
public class TimeLineEntity 
{
    @Id
    public Long id;
    public Long id_journo;
    public Long id_game;
    public LocalDate date_publish;
    public LocalTime time_publish;
    public String entry_title;
    public String entry_content;
}
